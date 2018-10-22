package com.dreamworks.lovefish.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;

/**
 * Created by mac on 2018/10/22.
 */
public class ObjectSerializerUtils {

    /**
     * ObjectSerializerUtils 日志控制器
     * Create by 叶云轩 at 2018/3/3 下午1:43
     * Concat at tdg_yyx@foxmail.com
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(ObjectSerializerUtils.class);

    /**
     * 反序列化
     *
     * @param data
     * @return
     */
    public static Object deSerilizer(byte[] data) {
        if (data != null && data.length > 0) {
            try {
                ByteArrayInputStream bis = new ByteArrayInputStream(data);
                ObjectInputStream ois = new ObjectInputStream(bis);
                return ois.readObject();
            } catch (Exception e) {
                LOGGER.info("[异常信息] {}", e.getMessage());
                e.printStackTrace();
            }
            return null;
        } else {
            LOGGER.info("[反序列化] 入参为空");
            return null;
        }
    }

    /**
     * 序列化对象
     *
     * @param obj
     * @return
     */
    public static byte[] serilizer(Object obj) {
        if (obj != null) {
            try {
                ByteArrayOutputStream bos = new ByteArrayOutputStream();
                ObjectOutputStream oos = new ObjectOutputStream(bos);
                oos.writeObject(obj);
                oos.flush();
                oos.close();
                return bos.toByteArray();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        } else {
            return null;
        }
    }

}
