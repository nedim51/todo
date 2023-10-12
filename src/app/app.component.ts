import { Component, OnInit } from '@angular/core';
import { NotificationService } from './components/shared/notification/notification-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notification: NotificationService) { }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.notification.info('Операция удалась', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellendus molestiae odio perspiciatis soluta, aspernatur explicabo et laborum reiciendis unde. Illum quidem, dicta earum modi facilis mollitia possimus ad ab quo architecto impedit? Cupiditate quia qui obcaecati, distinctio alias velit? Ut accusamus provident minus aut quo, quibusdam reiciendis eius modi esse optio, amet dolorem error assumenda dolore voluptate laboriosam beatae dolorum? Perspiciatis eveniet officiis molestiae quibusdam obcaecati quas et veniam distinctio a reiciendis enim ut, quod unde, dolor, at odio autem praesentium pariatur hic. Saepe quia cum laborum totam debitis soluta mollitia commodi quae, corrupti nobis, error, nostrum beatae deleniti.');
    //   this.notification.error('Операция не удалась', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellendus molestiae odio perspiciatis soluta, aspernatur explicabo et laborum reiciendis unde. Illum quidem, dicta earum modi facilis mollitia possimus ad ab quo architecto impedit? Cupiditate quia qui obcaecati, distinctio alias velit? Ut accusamus provident minus aut quo, quibusdam reiciendis eius modi esse optio, amet dolorem error assumenda dolore voluptate laboriosam beatae dolorum?', 3000);
    // }, 2800)
  }
}
