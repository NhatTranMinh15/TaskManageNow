package com.taskmanagenow.mapper;

import com.taskmanagenow.dto.request.CommentSaveRequest;
import com.taskmanagenow.dto.response.CommentResponse;
import com.taskmanagenow.model.Comment;
import org.springframework.stereotype.Service;

@Service

public class CommentMapper implements BaseMapper<Comment, CommentSaveRequest, CommentResponse> {

    @Override
    public Comment toEntity(CommentSaveRequest request) {
        Comment comment = new Comment();
        if (request.getId() != null) {
            comment.setId(request.getId());
        }
        comment = updateProperties(request, comment);
        return comment;
    }

    @Override
    public CommentResponse ToResponse(Comment entity) {
        CommentResponse commentResponse = new CommentResponse(
                entity.getId(),
                entity.getFromTaskId(),
                entity.getContent(),
                entity.getCreatedBy(),
                //                entity.getCreatedUser().getUsername(),
                entity.getCreatedAt(),
                entity.getUpdatedBy(),
                entity.getUpdatedAt());
        return commentResponse;
    }

    @Override
    public Comment transferPropertiesFrom(Comment oldEntity, Comment newEntity) {
        if (oldEntity == null || newEntity == null) {
            return null;
        }
        newEntity.setContent(oldEntity.getContent());
        newEntity.setTask(oldEntity.getTask());
        return newEntity;
    }

    @Override
    public Comment updateProperties(CommentSaveRequest request, Comment entity) {
        entity.setFromTaskId(request.getTaskId());
//        entity.setTask(new Task(request.getTaskId()));

        if (request.getContent() != null) {
            entity.setContent(request.getContent());
        }
        return entity;
    }

}
