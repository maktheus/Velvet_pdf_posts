package com.mutum.patadeveludo.exception;

public class WebhookSignatureException extends RuntimeException {

    public WebhookSignatureException(String message) {
        super(message);
    }
}
