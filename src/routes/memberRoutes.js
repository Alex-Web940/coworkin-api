import { Router } from 'express';
import { getMembers, getMemberById, createMember, updateMember, deleteMember } from '../controllers/memberController.js';

const router = Router();

router.route('/').get(getMembers).post(createMember);
router.route('/:id').get(getMemberById).put(updateMember).delete(deleteMember);

export default router;
