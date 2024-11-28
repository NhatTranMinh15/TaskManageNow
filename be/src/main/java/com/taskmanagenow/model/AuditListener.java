package com.taskmanagenow.model;

import com.taskmanagenow.util.Utility;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.time.LocalDateTime;

public class AuditListener {

    @PrePersist
    public <E extends BaseModel> void setCreatedBy(E e) {
        if (e != null) {
            e.setCreatedBy(Utility.getUserId());
            e.setCreatedAt(LocalDateTime.now());
        }
    }

    @PreUpdate
    public <E extends BaseModel> void setUpdatedBy(E e) {
        if (e != null) {
            e.setUpdatedBy(Utility.getUserId());
            e.setUpdatedAt(LocalDateTime.now());
        }
    }

}
