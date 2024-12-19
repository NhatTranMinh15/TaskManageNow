package com.taskmanagenow.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.taskmanagenow.model.composite.BlogComment;
import com.taskmanagenow.model.composite.BlogCategory;
import com.taskmanagenow.model.abtract.BaseModel;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Blog extends BaseModel {

    String title;

    @Column(unique = true)
    String slug;

    @Column(columnDefinition = "text")
    String preview;

    @Column(columnDefinition = "text")
    String content;

    int views;
    String thumbnail;
    String thumbnailAlt;

    @OneToMany(mappedBy = "blog", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    @JsonManagedReference
    List<BlogCategory> categories = new ArrayList<>();

    transient List<UUID> categoryIds = new ArrayList<>();

    @OneToMany(mappedBy = "blog", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<BlogComment> comments = new ArrayList<>();

    public Blog(UUID id) {
        super(id);
    }

    public void addView() {
        views++;
    }

    public void addComment(BlogComment comment) {
        comments.add(comment);
    }

    public void removeComment(BlogComment comment) {
        comments.remove(comment);
    }

    public void addCategory(BlogCategory category) {
        categories.add(category);
        category.setBlog(this);
    }

    public void removeCategory(BlogCategory category) {
        categories.remove(category);
        category.setBlog(null);
    }
}
