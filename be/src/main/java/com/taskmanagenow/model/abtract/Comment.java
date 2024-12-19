package com.taskmanagenow.model.abtract;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
public abstract class Comment<T extends Comment> extends BaseModel {
    
    @Column()
    private String content;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<T> replies = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    private T parent;
    
    transient UUID parentId;

}
