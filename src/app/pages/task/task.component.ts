import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TaskCommentService } from 'src/app/services/task-comment.service';
import { AttachmentService } from 'src/app/services/attachment.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  task: any;
  comments: any[] = [];
  attachments: any[] = [];
  newCommentText: string = '';
  currentUser = JSON.parse(localStorage.getItem('user') || '{}');


  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private taskCommentService: TaskCommentService,
    private attachmentService: AttachmentService
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.params['id'];
    console.log(taskId);
    
    this.loadTaskData(taskId);
    this.loadComments(taskId);
    this.loadAttachments(taskId);
  }

  private loadTaskData(taskId: number) {
    this.taskService.getTaskById(taskId).subscribe(taskData => {
      console.log(taskData);
      
      this.task = taskData;
    });
  }


  private loadComments(taskId: number) {
    this.taskCommentService.getCommentsByTaskId(taskId).subscribe(commentsData => {
      this.comments = commentsData;
    });
  }

  private loadAttachments(taskId: number) {
    this.attachmentService.getAttachmentsByTaskId(taskId).subscribe(attachmentsData => {
      this.attachments = attachmentsData;
    });
  }

  addComment() {
    const newComment = {
      text: this.newCommentText,
      taskId: this.task.id,
      userId: this.currentUser.id
    };

    this.taskCommentService.createTaskComment(newComment).subscribe(addedComment => {
      this.comments.push(addedComment);
      this.newCommentText = '';
    });
  }

  deleteComment(commentId: number) {
    this.taskCommentService.deleteTaskComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(comment => comment.id !== commentId);
    });
  }

  canEditOrDeleteComment(commentUserId: number): boolean {
    return this.currentUser.id === commentUserId;
  }

  editCommentId: number | null = null; // Идентификатор комментария, который редактируется

  // ... (существующий код)

  editComment(commentId: number) {
    this.editCommentId = commentId;
  }

  saveEditedComment(commentId: number) {
    const editedComment = this.comments.find(comment => comment.id === commentId);

    if (editedComment) {
      this.taskCommentService.updateTaskComment(commentId, editedComment).subscribe(updatedComment => {
        // Обновляем комментарий после успешного обновления
        const index = this.comments.findIndex(comment => comment.id === updatedComment.id);
        if (index !== -1) {
          this.comments[index] = updatedComment;
        }

        this.editCommentId = null; // Завершаем редактирование
      });
    }
  }

  cancelEditComment() {
    this.editCommentId = null; // Отменяем редактирование
  }
}

