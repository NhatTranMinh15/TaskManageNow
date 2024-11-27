package com.tmn.taskmanagenow.util;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import org.hibernate.annotations.IdGeneratorType;

@IdGeneratorType(IdGenerator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface RandomUUIDGenerator {

}
