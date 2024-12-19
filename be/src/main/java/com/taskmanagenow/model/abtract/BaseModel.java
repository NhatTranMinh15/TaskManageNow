package com.taskmanagenow.model.abtract;

import com.taskmanagenow.util.RandomUUIDGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@MappedSuperclass
@EntityListeners(AuditListener.class)
public abstract class BaseModel {

    @Id
    @RandomUUIDGenerator
    protected UUID id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(insertable = false)
    protected LocalDateTime updatedAt;

    @Column(nullable = false, updatable = false)
    protected UUID createdBy;

    protected UUID updatedBy;

    public BaseModel(UUID id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }

        final BaseModel other = (BaseModel) obj;
        return id != null && Objects.equals(this.id, other.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
