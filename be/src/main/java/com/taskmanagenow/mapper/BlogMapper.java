package com.taskmanagenow.mapper;

import com.ibm.icu.text.Transliterator;
import com.taskmanagenow.dto.query.BlogPreviewDTO;
import com.taskmanagenow.dto.request.BlogSaveRequest;
import com.taskmanagenow.dto.response.BlogResponse;
import com.taskmanagenow.dto.response.CategoryResponse;
import com.taskmanagenow.model.Blog;
import com.taskmanagenow.model.Category;
import com.taskmanagenow.model.composite.BlogCategory;
import java.text.Normalizer;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class BlogMapper implements BaseMapper<Blog, BlogSaveRequest, BlogResponse> {

    @Override
    public Blog toEntity(BlogSaveRequest request) {
        Blog blog = new Blog();
        if (blog.getId() != null) {
            blog.setId(request.getId());
        }
        updateProperties(request, blog);
        return blog;
    }

    @Override
    public BlogResponse toResponse(Blog entity) {
        return new BlogResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getSlug(),
                toCategoriesResponse(entity.getCategories()),
                entity.getThumbnail(),
                entity.getThumbnailAlt(),
                entity.getPreview(),
                entity.getContent(),
                entity.getViews(),
                entity.getCreatedBy(),
                entity.getCreatedAt());
    }

    public BlogResponse toPreviewResponse(BlogPreviewDTO entity) {
        return new BlogResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getSlug(),
                toCategoriesResponse(entity.getCategories()),
                entity.getThumbnail(),
                entity.getThumbnailAlt(),
                entity.getPreview(),
                "",
                entity.getViews(),
                entity.getCreatedBy(),
                entity.getCreatedAt());
    }

    public List toPreviewResponseList(List<BlogPreviewDTO> list) {
        return list.stream().map(this::toPreviewResponse).collect(Collectors.toList());
    }

    @Override
    public Blog transferPropertiesFrom(Blog oldEntity, Blog newEntity) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Blog updateProperties(BlogSaveRequest request, Blog entity) {
        entity.setTitle(request.getTitle());
        entity.setSlug(genSlug(request.getTitle()));
        entity.setPreview(request.getPreview());
        entity.setContent(request.getContent());
        List<UUID> uuids = List.of(request.getCategories());
        entity.setCategoryIds(uuids);
        return entity;
    }

    private List<CategoryResponse> toCategoriesResponse(List<BlogCategory> categories) {
        List<CategoryResponse> list = new ArrayList<>();
        for (BlogCategory category : categories) {
            list.add(new CategoryResponse(category.getId(), category.getCategory().getName(), category.getCategory().getName()));
        }
        return list;
    }

    public void setCategories(Blog blog, List<Category> categories) {
        for (Category c : categories) {
            blog.addCategory(new BlogCategory(blog, c));
        }
    }

    private static final String ASCII = "Cyrillic-Latin; Any-Latin; Latin-ASCII; [^\\p{Print}] Remove; ['\"] Remove";
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy");

    //    https://glaforge.dev/posts/2024/01/08/url-slug-or-how-to-remove-accents-in-java/
    public String genSlug(String title) {
        String transliterated = Transliterator.getInstance(ASCII).transliterate(title);
        String normalized = Normalizer
                .normalize(transliterated, Normalizer.Form.NFD)
                .toLowerCase() // "l'été, où es tu ?"
                .replaceAll("\\p{IsM}+", "") // "l'ete, ou es tu ?"
                .replaceAll("\\p{IsP}+", " ") // "l ete  ou es tu  "
                .trim() // "l ete  ou es tu"
                .replaceAll("\\s+", "-");
        String now = Long.toString(Instant.now().toEpochMilli());
        return normalized + "-" + now;
    }

}
