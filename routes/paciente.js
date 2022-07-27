const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Paciente')
const Paciente= mongoose.model('pacientes')

router.get('/find/:id', (req, res) => {
    Paciente.findById({_id:req.params.id}).then((pacientes)=> {
        res.json({pacientes: pacientes})
    }).catch((err) => {
        res.json({menssagem: "Usuário não econtrado"})
    })
})
// Rota de adição
router.post('/new', (req, res) => {
    const novoPaciente = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        cartao: req.body.cartao
        }

        new Paciente(novoPaciente).save().then((pacientes) => {
            res.json({message: "Paciente cadastrado com sucesso"})
            res.json({pacientes: pacientes})
            console.log('Salvo')
        }).catch((err) => {
            res.json({message: "erro ao salvar "+err})
            console.log('ERRO: '+err)
        })
    }
)
// Rota de recuperação
router.get('/all', (req, res) => {
    Paciente.find().lean().then((paciente) => {
        res.json({paciente: paciente})
    })
})
// Rota de atualização
router.put('/altera/:id', (req, res)=> {
    Paciente.findById({_id:req.params.id}).then((paciente) => {
        
            paciente.nome = req.body.nome
            paciente.endereco =  req.body.endereco
            paciente.cartao = req.body.cartao
       
        paciente.save().then(() => {
            res.json({message: "Alterado com sucesso!"})
            console.log('Alterado')
        }).catch((err) => {
            res.json({message: "Erro ao alterar: "+err})

            console.log('Erro: +err')
        })

    }).catch((err) => {
        res.json({message: "Erro ao editar"+err})
    })
})
// Rota de Exclusão
router.delete('/delete/:id', (req, res) => {
    Paciente.remove({_id:req.params.id}).then(() => {
        res.json({message: "Apagado com sucesso"})
    }).catch((err) => {
        res.json({message: "Erro ao excluir "+err})
    })
})

module.exports = router