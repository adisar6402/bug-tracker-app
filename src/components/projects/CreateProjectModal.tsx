import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../hooks/useProjects';

const createProjectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  color: z.string().min(1, 'Please select a color'),
});

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectColors = [
  '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B',
  '#EF4444', '#EC4899', '#14B8A6', '#F97316',
];

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { userProfile } = useAuth();
  const { createProject, isLoading } = useProjects();

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      color: '',
    },
  });

  const selectedColor = watch('color');

  const handleFormSubmit = async (data: CreateProjectFormData) => {
    if (!userProfile) {
      setSubmitError('User not logged in');
      return;
    }

    setSubmitError(null);

    try {
      await createProject({
        name: data.name,
        color: data.color,
        description: data.description,
        created_by: userProfile.id, // ensure user ID is passed
      });
      reset();
      onClose();
    } catch (error: any) {
      console.error('Error creating project:', error);
      setSubmitError(error.message || 'Something went wrong.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Name
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter project name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            placeholder="Describe your project..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Project Color
          </label>
          <div className="flex flex-wrap gap-3">
            {projectColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setValue('color', color, { shouldValidate: true })}
                className={`w-8 h-8 rounded-full transition-all duration-200 ${
                  selectedColor === color
                    ? 'ring-2 ring-offset-2 ring-purple-500 scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {errors.color && (
            <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
          )}
        </div>

        {submitError && (
          <div className="text-red-600 text-sm pt-2">{submitError}</div>
        )}

        <div className="flex justify-end space-x-3 pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};