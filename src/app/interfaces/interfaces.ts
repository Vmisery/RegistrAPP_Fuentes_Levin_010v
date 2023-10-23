export interface IDocente{
    id: number;
    email: String;
    password: String;
    nombre: String;
    apellido: String;
    asignaturas: String[];
    año: String;
    semestre: String;
    horassemanales: String;
}
export interface IAlumno{
    id: number;
    email: String;
    password: String;
    role: 'alumno' | 'docente';
}
export interface Asignatura{
    id: String;
    nombre: String;
}