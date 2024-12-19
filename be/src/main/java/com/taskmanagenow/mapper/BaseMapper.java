package com.taskmanagenow.mapper;

import java.util.List;
import java.util.stream.Collectors;

public interface BaseMapper<ENTITY, REQUEST, RESPONSE> {

    public ENTITY toEntity(REQUEST request);

    public RESPONSE toResponse(ENTITY entity);

    public default List<RESPONSE> toResponseList(List<ENTITY> list) {
        return list.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ENTITY transferPropertiesFrom(ENTITY oldEntity, ENTITY newEntity);

    public ENTITY updateProperties(REQUEST request, ENTITY entity);
}
