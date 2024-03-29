package com.moi.anitime.model.entity.chat;

import com.moi.anitime.api.response.chat.ChatRoomListRes;
import com.moi.anitime.model.entity.member.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "chatroom")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "findChatRoomsByGeneralNo",
                query = "SELECT " +
                        "chatroom.roomNo AS roomno, member.name AS name, (SELECT content from chatMessage WHERE chatmessage.roomNo = chatroom.roomNo ORDER BY chatmessage.writtentime DESC LIMIT 1) AS lastmsg, " +
                        "(SELECT writtenTime from chatMessage WHERE chatmessage.roomNo = chatroom.roomNo ORDER BY chatmessage.writtentime DESC LIMIT 1) AS lastTime, " +
                        "(SELECT COUNT(*) FROM chatmessage WHERE chatmessage.roomNo = chatroom.roomNo AND chatMessage.sendNo != :generalno AND chatmessage.isread = false) AS unreadcnt " +
                        "from chatroom " +
                        "join Member on ChatRoom.shelterno = Member.memberNo "+
                        "join ChatMessage on ChatRoom.roomNo = ChatMessage.roomNo " +
                        "where " +
                        "ChatRoom.generalNo = :generalno " +
                        "GROUP BY chatroom.roomNo " +
                        "ORDER BY lastTime DESC;",
                resultSetMapping = "findChatRoomsByMemberNo"
        ),
        @NamedNativeQuery(
                name = "findChatRoomsByShelterNo",
                query = "SELECT " +
                        "chatroom.roomNo AS roomno, member.name AS name, (SELECT content from chatMessage WHERE chatmessage.roomNo = chatroom.roomNo ORDER BY chatmessage.writtentime DESC LIMIT 1) AS lastmsg, " +
                        "(SELECT writtenTime from chatMessage WHERE chatmessage.roomNo = chatroom.roomNo ORDER BY chatmessage.writtentime DESC LIMIT 1) AS lastTime, " +
                        "(SELECT COUNT(*) FROM chatmessage WHERE chatmessage.roomNo = chatroom.roomNo AND chatMessage.sendNo != :shelterno AND chatmessage.isread = false) AS unreadcnt " +
                        "from chatroom " +
                        "join Member on ChatRoom.generalno = Member.memberNo "+
                        "join ChatMessage on ChatRoom.roomNo = ChatMessage.roomNo " +
                        "where " +
                        "ChatRoom.shelterno = :shelterno " +
                        "GROUP BY chatroom.roomNo " +
                        "ORDER BY lastTime DESC;",
                resultSetMapping = "findChatRoomsByMemberNo"
        )
})
@SqlResultSetMapping(
        name = "findChatRoomsByMemberNo",
        classes = @ConstructorResult(
                targetClass = ChatRoomListRes.class,
                columns = {
                        @ColumnResult(name = "roomNo", type = Integer.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "lastMsg", type = String.class),
                        @ColumnResult(name = "unreadCnt", type = Integer.class),
                        @ColumnResult(name = "lastTime", type = LocalDateTime.class)
                }
        )
)
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomno")
    private int roomNo;
    @ManyToOne
    @JoinColumn(name = "generalno")
    private Member generalMember;
    @ManyToOne
    @JoinColumn(name = "shelterno")
    private Member shelterMember;
}
