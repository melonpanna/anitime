package com.moi.anitime.exception;

import com.moi.anitime.api.response.CommonResponse;
import com.moi.anitime.api.ResponseServiceImpl;
import com.moi.anitime.exception.animal.CountAnimalsException;
import com.moi.anitime.exception.animal.NonExistDesertionNoException;
import com.moi.anitime.exception.auth.CAuthenticationEntryPointException;
import com.moi.anitime.exception.auth.NonValidJwtTokenException;
import com.moi.anitime.exception.chat.UnknownMemberKindException;
import com.moi.anitime.exception.donation.NonExistDonationBoardException;
import com.moi.anitime.exception.donation.NonExistDonationException;
import com.moi.anitime.exception.meeting.ExistReservationException;
import com.moi.anitime.exception.meeting.NonExistMeetNoException;
import com.moi.anitime.exception.member.*;
import com.moi.anitime.exception.profile.NoExistProfileNoException;
import com.moi.anitime.exception.profile.UnSupportedFileTypeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {
    private final ResponseServiceImpl responseService;

    @ExceptionHandler(NonRegisteredSnsException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonRegisteredSnsException() {
        log.error("sns email not registered");
        return responseService.getFailResponse(ExceptionList.NON_REGISTERED_SNS_EXCEPTION.getCode(), ExceptionList.NON_REGISTERED_SNS_EXCEPTION.getMessage());
    }

    @ExceptionHandler(SnsNotConnectedMemberException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse snsNotConnectedMemberException() {
        log.error("sns not connected member");
        return responseService.getFailResponse(ExceptionList.SNS_NOT_CONNECTED_MEMBER.getCode(), ExceptionList.SNS_NOT_CONNECTED_MEMBER.getMessage());
    }

    @ExceptionHandler(ExistReservationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse existReservationException() {
        log.error("reservation is already Exist at that time");
        return responseService.getFailResponse(ExceptionList.EXIST_RESERVATION_EXCEPTION.getCode(), ExceptionList.EXIST_RESERVATION_EXCEPTION.getMessage());
    }

    @ExceptionHandler(NonExistMeetNoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistMeetNoException() {
        log.error("meeting is not exist");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_MEET_NO.getCode(), ExceptionList.NON_EXIST_MEET_NO.getMessage());
    }

    @ExceptionHandler(ExistEmailException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse existEmailException() {
        log.error("exist email exception");
        return responseService.getFailResponse(ExceptionList.EXIST_EMAIL.getCode(), ExceptionList.EXIST_EMAIL.getMessage());
    }

    @ExceptionHandler(NonExistMemberNoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistMemberException() {
        log.error("no exist member exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_MEMBER_NO.getCode(), ExceptionList.NON_EXIST_MEMBER_NO.getMessage());
    }

    @ExceptionHandler(NonExistDesertionNoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistDesertionNoException() {
        log.error("no exist desertion no exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_DESERTION_NO.getCode(), ExceptionList.NON_EXIST_DESERTION_NO.getMessage());
    }

    @ExceptionHandler(UnknownMemberKindException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse unknownMemberKindException() {
        log.error("unknown member kind");
        return responseService.getFailResponse(ExceptionList.UNKNOWN_MEMBER_KIND.getCode(), ExceptionList.UNKNOWN_MEMBER_KIND.getMessage());
    }

    @ExceptionHandler(NoExistProfileNoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse noExistProfileException() {
        log.error("no exist profile exception");
        return responseService.getFailResponse(ExceptionList.NO_EXIST_PROFILE_NO.getCode(), ExceptionList.NO_EXIST_PROFILE_NO.getMessage());
    }

    @ExceptionHandler(PasswordIncorrectException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse passwordIncorrectException() {
        log.error("password incorrect exception");
        return responseService.getFailResponse(ExceptionList.PASSWORD_INCORRECT.getCode(), ExceptionList.PASSWORD_INCORRECT.getMessage());
    }

    @ExceptionHandler(CAuthenticationEntryPointException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse authenticationEntryPointException() {
        log.error("authentication exception");
        return responseService.getFailResponse(ExceptionList.AUTHENTICATION_ENTRY_POINT.getCode(), ExceptionList.AUTHENTICATION_ENTRY_POINT.getMessage());
    }

    @ExceptionHandler(NonValidJwtTokenException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse jwtTokenExpiredException() {
        log.error("jwt token expired");
        return responseService.getFailResponse(ExceptionList.NON_VALID_JWT_TOKEN.getCode(), ExceptionList.NON_VALID_JWT_TOKEN.getMessage());
    }

    @ExceptionHandler(NonExistEmailException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistEmailException() {
        log.error("no exist email exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_EMAIL.getCode(), ExceptionList.NON_EXIST_EMAIL.getMessage());
    }

    @ExceptionHandler(UnSupportedFileTypeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse unsupportedFileTypeException() {
        log.error("unsupported file type exception");
        return responseService.getFailResponse(ExceptionList.UNSUPPORTED_FILE_TYPE.getCode(), ExceptionList.UNSUPPORTED_FILE_TYPE.getMessage());
    }

    @ExceptionHandler(NonExistDonationBoardException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistDonationBoardException() {
        log.error("non exist donation board exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_DONATION_BOARD.getCode(), ExceptionList.NON_EXIST_DONATION_BOARD.getMessage());
    }

    @ExceptionHandler(NonExistDonationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse nonExistDonationException() {
        log.error("non exist donation exception");
        return responseService.getFailResponse(ExceptionList.NON_EXIST_DONATION.getCode(), ExceptionList.NON_EXIST_DONATION.getMessage());
    }

    @ExceptionHandler(CountAnimalsException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse CountAnimalsException() {
        log.error("counting animals exception");
        return responseService.getFailResponse(ExceptionList.FAILED_TO_COUNT_ANIMALS.getCode(), ExceptionList.FAILED_TO_COUNT_ANIMALS.getMessage());
    }

    @ExceptionHandler(EditInfoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse EditInfoException() {
        log.error("editing info exception");
        return responseService.getFailResponse(ExceptionList.FAILED_TO_EDIT_INFO.getCode(), ExceptionList.FAILED_TO_EDIT_INFO.getMessage());
    }

    // 제일 아래에 있었으면 합니다 - 민태 -
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResponse unknown(Exception e) {
        log.error("unknown exception {}", e.getMessage());
        return responseService.getFailResponse(ExceptionList.UNKNOWN.getCode(), ExceptionList.UNKNOWN.getMessage());
    }


}
