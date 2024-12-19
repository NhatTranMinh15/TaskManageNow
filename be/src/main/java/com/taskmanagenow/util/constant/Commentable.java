package com.taskmanagenow.util.constant;

public enum Commentable {
    BLOG("blog"), TASK("task");
    
    String name;

    private Commentable(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
    
}
