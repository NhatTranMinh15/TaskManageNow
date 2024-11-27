package com.tmn.taskmanagenow.util;

import com.tmn.taskmanagenow.model.BaseModel;
import java.io.Serializable;
import java.util.UUID;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.Configurable;
import org.hibernate.id.IdentifierGenerator;

public class IdGenerator implements IdentifierGenerator, Configurable {

    @Override
    public Serializable generate(SharedSessionContractImplementor ssci, Object o) {
        BaseModel bm = (BaseModel) o;
        if (bm.getId() == null) {
            bm.setId(UUID.randomUUID());
        }
        return bm.getId();
    }

}
