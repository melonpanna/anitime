package com.moi.anitime.api.request.member;

import com.moi.anitime.model.entity.member.GeneralMember;
import com.moi.anitime.model.entity.member.Member;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotBlank;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("generalMemberRegistReq")
public class GeneralMemberRegistReq {
	@NotBlank
	@ApiModelProperty(name="이메일")
	String email;
	@NotBlank
	@ApiModelProperty(name="패스워드")
	String password;
	@NotBlank
	@ApiModelProperty(name="전화번호")
	private String phone;
	@NotBlank
	@ApiModelProperty(name="이름")
	private String name;

	public Member toEntity(PasswordEncoder passwordEncoder) {
		Member member = GeneralMember.builder()
				.email(this.email)
				.password(passwordEncoder.encode(this.password))
				.memberKind(0)
				.phone(this.phone)
				.name(this.name)
				.snsCheck(false)
				.snsToken("")
				.build();
		return member;
	}
}
