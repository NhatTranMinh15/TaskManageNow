package com.taskmanagenow.model.composite;

import com.taskmanagenow.model.Blog;
import com.taskmanagenow.model.abtract.Comment;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class BlogComment extends Comment<BlogComment>{
    
    @ManyToOne(fetch = FetchType.LAZY)
    private Blog blog;
}
