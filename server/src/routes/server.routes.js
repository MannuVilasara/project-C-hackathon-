import express from 'express'
import { addServer, getUserServers ,deleteServer} from '../controller/server.controller.js'
import { userAuth } from '../middlewares/userAuth.js'


const router=express.Router()


router.post('/add/server',userAuth,addServer)
router.get('/my/servers',userAuth,getUserServers)
router.delete('/delete/server/:id',userAuth,deleteServer)

export default router