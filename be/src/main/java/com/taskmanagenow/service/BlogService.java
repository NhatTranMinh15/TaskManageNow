package com.taskmanagenow.service;

import com.taskmanagenow.dto.query.BlogPreviewDTO;
import com.taskmanagenow.dto.request.BlogGetRequest;
import com.taskmanagenow.dto.request.BlogSaveRequest;
import com.taskmanagenow.dto.response.BlogResponse;
import com.taskmanagenow.dto.response.PageResponse;
import com.taskmanagenow.exception.ResourceNotFoundException;
import com.taskmanagenow.mapper.BlogCommentMapper;
import com.taskmanagenow.mapper.BlogMapper;
import com.taskmanagenow.model.Blog;
import com.taskmanagenow.model.Category;
import com.taskmanagenow.repository.BlogCommentRepository;
import com.taskmanagenow.repository.BlogRepository;
import com.taskmanagenow.repository.CategoryRepository;
import com.taskmanagenow.service.interfaces.BlogServiceInterface;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class BlogService implements BlogServiceInterface {

    private final BlogRepository repository;
    private final BlogCommentRepository commentRepository;
    private final CategoryRepository categoryRepository;
    private final BlogMapper mapper;
    private final BlogCommentMapper commentMapper;

    @Transactional
    public PageResponse getAllPreviews(BlogGetRequest request, Pageable pageable, Authentication authentication) {
        Page<BlogPreviewDTO> result = repository.findAllPreviews(pageable);
        return new PageResponse(mapper.toPreviewResponseList(result.getContent()), result.getNumber(), result.getTotalPages(), result.getTotalElements());
    }

    @Transactional
    public PageResponse getAll(BlogGetRequest request, Pageable pageable, Authentication authentication) {
        Page<Blog> result = repository.findAll(pageable);
        return new PageResponse(mapper.toResponseList(result.getContent()), result.getNumber(), result.getTotalPages(), result.getTotalElements());
    }

    @Transactional
    public BlogResponse saveOne(BlogSaveRequest request, Authentication authentication) {
        Blog blog = mapper.toEntity(request);
        List<Category> categories = categoryRepository.findAllById(blog.getCategoryIds());
        mapper.setCategories(blog, categories);
        repository.save(blog);
        return mapper.toResponse(blog);
    }

    @Transactional
    public BlogResponse getBySlug(String slug) {
        Blog blog = repository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Blog does not exist!"));
        blog.addView();
        CompletableFuture.runAsync(() -> repository.updateView(blog.getId(), blog.getViews()));
        return mapper.toResponse(blog);
    }

}
