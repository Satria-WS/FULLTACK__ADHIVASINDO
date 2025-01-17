import Content from "../models/contentModel";
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

interface CreateContentRequest extends Request {
  body: {
    title: string;
    description: string;
  };
  user?: {
    id: string;
  };
}

interface UpdateContentRequest extends Request {
  params: {
    id: string;
  };
  body: {
    title: string;
    description: string;
  };
}

interface DeleteContentRequest extends Request {
  params: {
    id: string;
  };
}

// interface AuthenticatedRequest extends Request {
//   user?: { id: string }; // Ensure `user` exists and has an `id`
// }

export const listContent = (req: Request, res: Response) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  Content.list(Number(page), Number(limit), search, (err, contents) => {
    if (err) return res.status(500).json({ message: 'Error fetching content' });
    res.json(contents);
  });
};

export const getContentById = (req: Request, res: Response) => {
  const { id } = req.params;

  Content.getById(Number(id), (err, content) => {
    if (err) return res.status(500).json({ message: 'Error fetching content' });
    if (!content) return res.status(404).json({ message: 'Content not found' });
    res.json(content);
  });
};

// byUser
export const listContentByUser = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user || !req.user.id) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  const userId = parseInt(req.user.id, 10);

  Content.listByUserId(userId, (err, contents) => {
    if (err) return res.status(500).json({ message: 'Error fetching content' });
    res.json(contents);
  });
};

export const createContent = (req:CreateContentRequest , res:Response) => {
  const { title, description } = req.body;

  if (!req.user || !req.user.id) {
     res.status(400).json({ message: 'User not authenticated' });
    return;
  }

  Content.create(title, description, req.user.id, (err, contentId) => {
    if (err) return res.status(500).json({ message: 'Error creating content' });
    res.status(201).json({ message: 'Content created successfully', contentId });
  });
};

export const updateContent = (req: UpdateContentRequest, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  Content.update(id, title, description, (err, affectedRows) => {
    if (err || affectedRows === 0) return res.status(400).json({ message: 'Error updating content' });
    res.json({ message: 'Content updated successfully' });
  });
};

export const deleteContent = (req: DeleteContentRequest, res: Response) => {
  const { id } = req.params;

  Content.delete(id, (err, affectedRows) => {
    if (err || affectedRows === 0) return res.status(400).json({ message: 'Error deleting content' });
    res.json({ message: 'Content deleted successfully' });
  });
};