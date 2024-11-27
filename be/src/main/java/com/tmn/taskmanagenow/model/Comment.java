package com.tmn.taskmanagenow.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import java.util.UUID;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Comment extends BaseModel {

    @Column()
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    private Task task;

    private UUID fromTaskId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Comment parentComment;

}
