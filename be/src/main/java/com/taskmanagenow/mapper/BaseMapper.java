package com.taskmanagenow.mapper;

import java.util.List;
import java.util.stream.Collectors;

public interface BaseMapper<ENTITY, REQUEST, RESPONSE> {

    public ENTITY toEntity(REQUEST request);

    public RESPONSE ToResponse(ENTITY entity);

    public default List<RESPONSE> ToResponseList(List<ENTITY> list) {
        return list.stream().map(this::ToResponse).collect(Collectors.toList());
    }

    public ENTITY transferPropertiesFrom(ENTITY oldEntity, ENTITY newEntity);

    public ENTITY updateProperties(REQUEST request, ENTITY entity);
}
