package com.dreamworks.lovefish.entity;

import lombok.Data;

import java.io.Serializable;
/**
 * Created by mac on 2018/10/22.
 */
@Data
public class NullWritable implements Serializable {

    /**
     * 序列化标识
     */
    private static final long serialVersionUID = 2123827169429254101L;
    /**
     * 单例
     */
    private static NullWritable instance = new NullWritable();

    /**
     * 私有构造器
     */
    private NullWritable() {
    }

    public static NullWritable nullWritable() {
        return instance;
    }

}
