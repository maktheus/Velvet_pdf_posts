package com.mutum.patadeveludo.exception;

public class UnsupportedGatewayException extends RuntimeException {

    public UnsupportedGatewayException(String message) {
        super(message);
    }

    public UnsupportedGatewayException(String message, Throwable cause) {
        super(message, cause);
    }
}
