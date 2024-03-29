package com.moi.anitime.api.controller;

import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Map;

@Api(value = "입양동물 API", tags = {"Animal"})
@CrossOrigin
@RestController
@RequestMapping("/api/openvidu")
public class OpenViduController
{

    @Value("${openvidu.url}")
    private String url;

    @Value("${openvidu.secret}")
    private String secret;

    private OpenVidu openvidu;
    @PostConstruct
    public void init(){
        this.openvidu = new OpenVidu(url,secret);
    }



    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
//		.fromJson(params)
        ConnectionProperties properties = ConnectionProperties
                .fromJson(params)
//                .build();
//                .Builder()
                .type(ConnectionType.WEBRTC)
//                .data(new Gson().toJson(params))
                .role(OpenViduRole.PUBLISHER)
                .kurentoOptions(
                        new KurentoOptions.Builder()
                                .allowedFilters(new String[]{"GStreamerFilter", "FaceOverlayFilter"})
                                .build())
                .build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}
