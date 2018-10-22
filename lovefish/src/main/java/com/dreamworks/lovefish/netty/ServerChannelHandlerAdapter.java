package com.dreamworks.lovefish.netty;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerAdapter;
import io.netty.channel.ChannelHandlerContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by mac on 2018/10/22.
 */
@Component
@Sharable
public class ServerChannelHandlerAdapter extends ChannelHandlerAdapter {

    /**
     * 日志处理
     */
    private Logger logger = LoggerFactory.getLogger(ServerChannelHandlerAdapter.class);
    /**
     * 注入请求分排器
     */
    @Resource
    private RequestDispatcher dispatcher;

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        MethodInvokeMeta invokeMeta = (MethodInvokeMeta) msg;
        // 屏蔽toString()方法
        if (invokeMeta.getMethodName().endsWith("toString()")
                && !"class java.lang.String".equals(invokeMeta.getReturnType().toString()))
            logger.info("客户端传入参数 :{},返回值：{}",
                    invokeMeta.getArgs(), invokeMeta.getReturnType());
        dispatcher.dispatcher(ctx, invokeMeta);
    }

}
