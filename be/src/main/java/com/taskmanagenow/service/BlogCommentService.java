package com.taskmanagenow.service;

import com.taskmanagenow.dto.request.CommentSaveRequest;
import com.taskmanagenow.dto.response.CommentResponse;
import com.taskmanagenow.dto.response.PageResponse;
import com.taskmanagenow.mapper.BlogCommentMapper;
import com.taskmanagenow.model.composite.BlogComment;
import com.taskmanagenow.repository.BlogCommentRepository;
import com.taskmanagenow.repository.BlogRepository;
import com.taskmanagenow.service.interfaces.CommentServiceInterface;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class BlogCommentService implements CommentServiceInterface {

    BlogRepository blogRepository;
    BlogCommentRepository repository;
    BlogCommentMapper mapper;

    public PageResponse getAllCommentOfBlog(UUID id, Pageable pageable, Authentication authentication) {
        Page<BlogComment> result = repository.findAll(pageable);
        return new PageResponse(mapper.toResponseList(result.getContent()), result.getNumber(), result.getTotalPages(), result.getTotalElements());
    }

    @Transactional(rollbackOn = {RuntimeException.class})
    public CommentResponse createCommentOfBlog(UUID id, CommentSaveRequest request, Authentication authentication) {
        BlogComment comment = mapper.toEntity(request);
        if (comment.getParentId() != null) {
            BlogComment parent = repository.findById(comment.getParentId()).orElseThrow(() -> new EntityNotFoundException("No comment found to replies to"));
            parent.getReplies().add(comment);
            comment.setParent(parent);
        }
        comment = repository.save(comment);
        return mapper.toResponse(comment);
    }

}
