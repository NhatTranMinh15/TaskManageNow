package com.tmn.user_event_listener;

public class Token {

    String access_token;
    int expires_in;
    int refresh_expires_in;
    String refresh_token;
    String token_type;
    String id_token;
    long not_before_policy;
    String session_state;
    String scope;

    public Token() {
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public int getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(int expires_in) {
        this.expires_in = expires_in;
    }

    public int getRefresh_expires_in() {
        return refresh_expires_in;
    }

    public void setRefresh_expires_in(int refresh_expires_in) {
        this.refresh_expires_in = refresh_expires_in;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public String getId_token() {
        return id_token;
    }

    public void setId_token(String id_token) {
        this.id_token = id_token;
    }

    public long getNot_before_policy() {
        return not_before_policy;
    }

    public void setNot_before_policy(long not_before_policy) {
        this.not_before_policy = not_before_policy;
    }

    public String getSession_state() {
        return session_state;
    }

    public void setSession_state(String session_state) {
        this.session_state = session_state;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    @Override
    public String toString() {
        return "Token{" + "access_token=" + access_token + ", expires_in=" + expires_in + ", refresh_expires_in=" + refresh_expires_in + ", refresh_token=" + refresh_token + ", token_type=" + token_type + ", id_token=" + id_token + ", not_before_policy=" + not_before_policy + ", session_state=" + session_state + ", scope=" + scope + '}';
    }
    
    
}
