package com.dreamworks.lovefish.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by mac on 2018/10/22.
 */
@Controller
public class Main {

   @RequestMapping(value = "/index", method = RequestMethod.GET)
   @ResponseBody
    public String index(){
        return "index";
    }
}
