package com.moi.anitime.model.service.chat;

import com.moi.anitime.api.request.chat.ChatMessageReq;
import com.moi.anitime.api.response.chat.ChatMeetRes;
import com.moi.anitime.api.response.chat.ChatRes;
import com.moi.anitime.api.response.chat.ChatRoomInitRes;
import com.moi.anitime.api.response.chat.ChatRoomListRes;
import com.moi.anitime.exception.animal.NonExistDesertionNoException;
import com.moi.anitime.exception.chat.UnknownMemberKindException;
import com.moi.anitime.exception.meeting.NonExistMeetNoException;
import com.moi.anitime.exception.member.NonExistMemberNoException;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.chat.ChatMessage;
import com.moi.anitime.model.entity.chat.ChatRoom;
import com.moi.anitime.model.entity.meeting.Meeting;
import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import com.moi.anitime.model.entity.member.MemberKind;
import com.moi.anitime.model.entity.member.ShelterMember;
import com.moi.anitime.model.repo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@RequiredArgsConstructor
@Service
@Slf4j

public class ChatServiceImpl implements ChatService {
	private final ChatRoomRepo chatRoomRepo;
	private final ChatMessageRepo chatMessageRepo;
	private final AnimalRepo animalRepo;
	private final MemberRepo memberRepo;
	private final MeetingRepo meetingRepo;
	private final SimpMessageSendingOperations smso;

	private final String FIRST_MESSAGE = "유기번호 :  ";
	private final String LAST_MESSAGE = " 의 채팅이 시작되었습니다.";
	@Override
	public List<ChatRoomListRes> getRoomsByMemberNo(int memberKind, int memberNo) throws UnknownMemberKindException {
		if(memberKind == MemberKind.GENERAL.getCode()) return chatRoomRepo.findChatRoomsByGeneralNo(memberNo);
		else if(memberKind == MemberKind.SHELTER.getCode()) return chatRoomRepo.findChatRoomsByShelterNo(memberNo);
		else throw new UnknownMemberKindException();
	}

	@Transactional
	@Override
	public ChatRoomInitRes initChatRoom(int generalNo, long desertionNo) throws NonExistDesertionNoException{
		Optional<Animal> animal = animalRepo.findById(desertionNo);
		if(!animal.isPresent()) throw new NonExistDesertionNoException();
		int shelterNo = animal.get().getShelterNo();

		ChatRoomInitRes.ChatRoomInitResBuilder resBuilder = ChatRoomInitRes.builder();
		Member generalMember = memberRepo.getReferenceById(generalNo);
		Member shelterMember = memberRepo.getReferenceById(shelterNo);
		Optional<ChatRoom> tmpRoom = chatRoomRepo.findChatRoomByGeneralMember_MemberNoAndShelterMember_MemberNo(generalNo, shelterNo);
		ChatRoom room = null;
		if(tmpRoom.isPresent()) {
			room = tmpRoom.get();
			chatMessageRepo.updateChatMessagesRead(room.getRoomNo(), generalNo);
		}
		else {
			ChatRoom newRoom = ChatRoom.builder()
					.generalMember(generalMember)
					.shelterMember(shelterMember)
					.build();
			room = chatRoomRepo.save(newRoom);
		}
		StringBuilder message = new StringBuilder();
		message.append(FIRST_MESSAGE).append(animal.get().getDesertionNo()).append(LAST_MESSAGE);

		Optional<ChatMessage> isFirstAnimal = chatMessageRepo.findChatMessageByContentAndChatRoom_RoomNo(message.toString(), room.getRoomNo());
		if(!isFirstAnimal.isPresent()) {
			ChatMessage firstMessage = ChatMessage.builder()
					.chatRoom(room)
					.sender(generalMember)
					.type(0)
					.content(message.toString())
					.isread(false).build();
			chatMessageRepo.save(firstMessage);
			smso.convertAndSend("/topic/room."+firstMessage.getChatRoom().getRoomNo(), firstMessage);
		}

		resBuilder
				.roomNo(room.getRoomNo())
				.chatMessage(this.getChats(room.getRoomNo()));
		return resBuilder.build();
	}

	@Transactional
	@Override
	public List<ChatRes> enterChatRoom(int memberNo, int roomNo) throws NonExistDesertionNoException {
		chatMessageRepo.updateChatMessagesRead(roomNo, memberNo);
		return getChats(roomNo);
	}

	@Override
	public ChatRes sendChat(ChatMessageReq message) {
		ChatRoom room = chatRoomRepo.getReferenceById(message.getRoomNo());
		Member sender = memberRepo.getReferenceById(message.getSendNo());
		ChatMessage chat = message.toEntity(room, sender);
		chat = chatMessageRepo.save(chat);
		return ChatRes.builder()
				.chatNo(chat.getChatNo())
				.sendNo(chat.getSender().getMemberNo())
				.content(chat.getContent())
				.writtenTime(chat.getWrittenTime()).build();
	}

	private List<ChatRes> getChats(int roomNo) {
		List<ChatRes> resChat = new ArrayList<>();
		chatMessageRepo.findChatMessageByChatRoom_RoomNoOrderByWrittenTimeAsc(roomNo).stream().forEach(chatMessage -> {
			resChat.add(ChatRes.builder()
					.chatNo(chatMessage.getChatNo())
					.sendNo(chatMessage.getSender().getMemberNo())
					.content(chatMessage.getContent())
					.writtenTime(chatMessage.getWrittenTime()).build());
		});
		return resChat;
	}

	@Override
	public void resetReadCnt(int roomNo, int memberNo) {
		chatMessageRepo.updateChatMessagesRead(roomNo, memberNo);
	}

	@Override
	public ChatMeetRes getChatNoByMeeting(int meetNo) throws NonExistMeetNoException{
		Optional<Meeting> tmpMeet = meetingRepo.findById(meetNo);
		if(!tmpMeet.isPresent()) throw new NonExistMeetNoException();
		Meeting meet = tmpMeet.get();
		int generalNo = meet.getMember().getMemberNo();
		int shelterNo = meet.getAnimal().getShelterNo();
		ChatMeetRes.ChatMeetResBuilder res = ChatMeetRes.builder();
		Optional<ChatRoom> tmpRoom = chatRoomRepo.findChatRoomByGeneralMember_MemberNoAndShelterMember_MemberNo(generalNo, shelterNo);
		ChatRoom room = null;
		if(!tmpRoom.isPresent()) {
			Member generalMember = memberRepo.getReferenceById(generalNo);
			Member shelterMember = memberRepo.getReferenceById(shelterNo);
			ChatRoom newRoom = ChatRoom.builder()
					.generalMember(generalMember)
					.shelterMember(shelterMember)
					.build();
			room = chatRoomRepo.save(newRoom);
			res.generalName(generalMember.getName())
					.shelterName(shelterMember.getName());
		} else {
			room = tmpRoom.get();
			Optional<Member> shelterMember = memberRepo.findById(shelterNo);
			if(!shelterMember.isPresent()) throw new NonExistMemberNoException();
			res.generalName(meet.getMember().getName())
					.shelterName(shelterMember.get().getName());
		}
		res.roomNo(room.getRoomNo());
		return res.build();
	}
}