import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../TaskCard';
import { BrowserRouter } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';

vi.mock('../../context/TaskContext', () => ({
  useTasks: vi.fn(),
}));

describe('TaskCard con Vitest', () => {
  const task = {
    _id: '123',
    title: 'Tarea de prueba',
    description: 'Descripción de prueba',
    date: '2024-05-20T00:00:00.000Z',
  };

  it('muestra los datos de la tarea', () => {
    useTasks.mockReturnValue({ deleteTask: vi.fn() });

    render(
      <BrowserRouter>
        <TaskCard task={task} />
      </BrowserRouter>
    );

    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
    expect(screen.getByText('20/05/2024')).toBeInTheDocument();
  });

  it('ejecuta deleteTask al hacer clic en eliminar', () => {
    const deleteMock = vi.fn();
    useTasks.mockReturnValue({ deleteTask: deleteMock });

    render(
      <BrowserRouter>
        <TaskCard task={task} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('delete'));
    expect(deleteMock).toHaveBeenCalledWith('123');
  });
});
