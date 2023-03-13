package com.exam.controller;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @PutMapping("/")
    public ResponseEntity<?> updateQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    @GetMapping("/")
    public ResponseEntity<?> getQuestions() {
        return ResponseEntity.ok(this.questionService.getQuestions());
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<?> getQuestion(@PathVariable("questionId") Long questionId) {
        return ResponseEntity.ok(this.questionService.getQuestion(questionId));
    }


    //get all questions of any quizId
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("quizId") Long quizId) {

        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questionSet = quiz.getQuestions();

        List<Question> list = new ArrayList(questionSet);

        Collections.shuffle(list);

        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }

        /*
         * Admin is not using this API,
         * This API is used while, giving quiz.
         * So, we are setting answers as empty, so that user cant see the answer while giving quiz from inspect
         * element.
         * */
        list.forEach((q) -> {
            q.setAnswer("");
        });

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }


    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<?> getAllQuestionOfQuiz(@PathVariable("quizId") Long quizId) {

        Quiz quiz = new Quiz();
        quiz.setqId(quizId);
        Set<Question> questionSet = this.questionService.getQuestionOfQuiz(quiz);

        return ResponseEntity.ok(questionSet);
    }

    //delete question
    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId) {
        this.questionService.deleteQuestion(questionId);
    }


    //evaluate quiz
    @PostMapping("/evalQuiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {
        //System.out.println(questions);

        double marksGot = 0;
        Integer correctAnswers = 0;
        Integer attempted = 0;

        for (Question q : questions) {

            Question question = this.questionService.getQuestion(q.getQuesId());

            if (question.getAnswer().equals(q.getGivenAnswer())) {
                correctAnswers++;

                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();

                marksGot += marksSingle;
            }

            if (q.getGivenAnswer() != null) {
                attempted++;
            }
        }

        Map<Object, Object> map = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted", attempted);
        return ResponseEntity.ok(map);
    }


}
