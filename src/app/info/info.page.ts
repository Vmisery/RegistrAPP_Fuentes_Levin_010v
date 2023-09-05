// @ts-nocheck
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})

export class InfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  items = [
    {
      title: '',
      image: 'assets/paso1.png',
      text: '',
      subtitle: 'Si es la primera vez que usas la app, registrate con tu correo institucional',
      expanded: true,
    },
    {
      title: '',
      image: 'assets/paso2.png',
      text: '',
      subtitle: 'Si ya tienes una cuenta, puedes iniciar sesión!',
      expanded: true,
    },
    {
      title: '',
      image: 'assets/paso3.png',
      text: '',
      subtitle: 'Luego presiona el botón + para registrar tu asistencia',
      expanded: true,
    },
    {
      title: '',
      image: 'assets/paso4.png',
      text: '',
      subtitle: 'Escanea el código QR brindado por el profesor',
      expanded: true,
    },
    {
      title: '',
      image: 'assets/paso5.png',
      text: '',
      subtitle: 'Y listo!, así de fácil es registrar tu asistencia',
      expanded: true,
    },


  ];

  toggleItem(item) {
    item.expanded = !item.expanded;
  }
}
