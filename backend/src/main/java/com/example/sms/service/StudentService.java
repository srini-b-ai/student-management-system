package com.example.sms.service;

import com.example.sms.entity.Student;
import com.example.sms.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository repo;

    public List<Student> getAll() {
        return repo.findAll();
    }

    public Student create(Student student) {
        return repo.save(student);
    }

    public Student update(Long id, Student student) {
        Student existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setCourses(student.getCourses());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}