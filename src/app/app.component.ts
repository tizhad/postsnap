import { Component } from '@angular/core';
import { PostContainerComponent } from './components/posts/post-container/post-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'postsnap';
}
