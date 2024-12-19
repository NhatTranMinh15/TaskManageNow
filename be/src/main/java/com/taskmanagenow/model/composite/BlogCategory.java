package com.taskmanagenow.model.composite;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.taskmanagenow.model.Blog;
import com.taskmanagenow.model.abtract.BaseModel;
import com.taskmanagenow.model.Category;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class BlogCategory extends BaseModel {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonBackReference
    Blog blog;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JsonManagedReference
    Category category;

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 17 * hash + Objects.hashCode(this.blog.getId());
        hash = 17 * hash + Objects.hashCode(this.category.getId());
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final BlogCategory other = (BlogCategory) obj;
        if (!Objects.equals(this.blog, other.blog)) {
            return false;
        }
        return Objects.equals(this.category, other.category);
    }

}
