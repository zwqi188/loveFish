package com.dreamworks.lovefish.netty;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by mac on 2018/10/22.
 */
@Component
@ConfigurationProperties(prefix = "netty")
public class NettyConfig {

    private int port;

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }
}
