package com.taskmanagenow.mapper;

import com.taskmanagenow.dto.request.CommentSaveRequest;
import com.taskmanagenow.dto.response.CommentResponse;
import com.taskmanagenow.model.composite.BlogComment;
import org.springframework.stereotype.Service;

@Service
public class BlogCommentMapper implements BaseMapper<BlogComment, CommentSaveRequest, CommentResponse> {
    
    @Override
    public BlogComment toEntity(CommentSaveRequest request) {
        BlogComment comment = new BlogComment();
        if (request.getId() != null) {
            comment.setId(request.getId());
        }
        comment = updateProperties(request, comment);
        return comment;
    }
    
    @Override
    public CommentResponse toResponse(BlogComment entity) {
        CommentResponse commentResponse = new CommentResponse(
                entity.getId(),
                entity.getContent(),
                entity.getCreatedBy(),
                entity.getCreatedAt(),
                entity.getUpdatedBy(),
                entity.getUpdatedAt());
        return commentResponse;
    }
    
    @Override
    public BlogComment transferPropertiesFrom(BlogComment oldEntity, BlogComment newEntity) {
        if (oldEntity == null || newEntity == null) {
            return null;
        }
        newEntity.setContent(oldEntity.getContent());
        return newEntity;
    }
    
    @Override
    public BlogComment updateProperties(CommentSaveRequest request, BlogComment entity) {
        entity.setContent(request.getContent());
        if (request.getParentId() != null) {
            entity.setParentId(request.getParentId());
        }
        return entity;
    }
}
