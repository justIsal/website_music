const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const session = require('express-session');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(expressLayouts);

// ejs
app.set('view engine', 'ejs');
// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/lagu'); 
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName); 
    }
});
// mysql
const upload = multer({ storage: storage });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'music',
    port: 3306
})
// session
app.use(
    session({
        secret: 'my_secret_key',
        resave: false,
        saveUninitialized: false
    })
);
app.use((req,res,next)=> {
    if(req.session.name === undefined) {
        res.locals.name = 'Tamu';
        res.locals.login = false;
    }else {
        res.locals.id_user = req.session.id_user;
        res.locals.name = req.session.name;
        res.locals.login = true;
    }
    next()
})
// login
app.get('/',(req,res) => {
    res.render('login',{
        title: 'Login',
        layout: 'layout/main-layout'
    })
})
app.post('/login',(req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    connection.query('SELECT * FROM users WHERE user_name=?',[username],(error,results)=> {
        if(results.length > 0) {
            if(password == results[0].password_user) {
                req.session.name = results[0].user_name;
                req.session.id_user = results[0].id_user;
                if(results[0].user_name === 'admin'){
                    console.log('admin yeuh');
                    res.redirect('/admin');
                }else {
                    res.redirect('/index')
                }
            }else {
                res.redirect('/');
                console.log('password salah')
            }
        }else {
            res.redirect('/');
            console.log('tidak ada')
        }
    })
})
// signup
app.get('/signup',(req,res)=> {
    res.render('signup',{
        title: 'Signup',
        layout: 'layout/main-layout'
    });
})
app.post('/create_new_user',(req,res,next)=> {
    const error = [];
    const nama = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    //validasi memeriksa error
    if(nama === ""){
        error.push('nama tidak boleh kosong')
    };
    if(email === ""){
        error.push('email tidak boleh kosong')
    }
    if(password === ""){
        error.push('password tidak boleh kosong')
    }
    if(error.length > 0){
        res.render('signup',{
            title: 'Signup',
            layout: 'layout/main-layout',
            errors:error
        });
        console.log(error)
    }else {
        next();
    }
},(req,res,next)=>{
    //memeriksa duplikat
    const nama = req.body.username;
    const email = req.body.email;
    const errort = []
    connection.query('SELECT * FROM users WHERE email_user = ?',[email],(error,result)=> {
        if(result.length > 0){
            console.log('validasi email');
            errort.push('email sudah ada!');
            console.log(result)
        };
        connection.query('SELECT * FROM users WHERE user_name = ?',[nama],(error,resultNama)=> {
            console.log('validasi nama');
            if(resultNama.length > 0){
                console.log('validasi nama');
                errort.push('nama sudah ada!');
                console.log(result)
            };
            console.log(errort);
            if(errort.length > 0){
                res.render('signup',{
                    title: 'Signup',
                    layout: 'layout/main-layout',
                    errors:error
                });
            } else {
                next();
            }
        });
    })
},(req,res,next)=> {
    //daftar user
    const nama = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    connection.query('INSERT INTO users (user_name,email_user,password_user) VALUES (?,?,?)',[nama,email,password],(req,result)=> {
        console.log('daftar berhasil');
        res.redirect('/');
    })
})
// logout
app.get('/logout',(req,res)=> {
    req.session.destroy((error)=> {
        res.redirect('/')
    })
})

// home
app.get('/index',(req, res) => {
    const data = res.locals.id_user;
    connection.query(
        'SELECT * FROM playlist WHERE id_user=?',[data],(error,results)=> {
            res.render('index',{
                playlist:results,
                title: 'Login',
                layout: 'layout/main-layout'
            });
        }
    )
});
// menampilkan semua lagu
app.get('/allLagu',(req,res) => {
    const data = res.locals.id_user;
    connection.query(
        'SELECT * FROM playlist WHERE id_user=?',data,(error,dataPlaylist)=> {
            connection.query(
                'SELECT lagu.id_lagu,lagu.judul_lagu,lagu.path,artis.nama_artis,lagu.lirik,album.nama_album,lagu.single,album.path_album from lagu JOIN artis ON lagu.id_artis = artis.id_artis JOIN album ON lagu.id_album=album.id_album',(error,dataLagu)=> {
                    res.render('all_lagu',{
                        playlist:dataPlaylist,
                        data:dataLagu,
                        title: 'Login',
                        layout: 'layout/main-layout'
                    });
                }
            )
        }
    )
});
// playlist
app.get('/playlist/:id',(req,res)=>{
    const data = res.locals.id_user;
    connection.query(
        'SELECT * FROM playlist WHERE id_user=?',data,(error,dataPlaylist)=> {
            const query = 'SELECT playlist_lagu.id_playlist,playlist.nama_playlist,playlist.description,playlist_lagu.id_lagu,lagu.judul_lagu,lagu.path,lagu.lirik,album.nama_album,album.path_album FROM playlist_lagu JOIN lagu ON playlist_lagu.id_lagu=lagu.id_lagu JOIN playlist ON playlist_lagu.id_playlist = playlist.id_playlist JOIN album ON lagu.id_album = album.id_album WHERE playlist_lagu.id_playlist =?'
            connection.query(query,[req.params.id],(error,results)=> {
                if(results.length > 0) {
                        res.render('playlist',{
                            title: 'Login',
                            layout: 'layout/main-layout',
                            playlist:dataPlaylist,
                            data:results,
                            status:true,        

                        });
                        // console.log(results);
                    }else {
                        res.render('playlist',{
                            title: 'Login',
                            layout: 'layout/main-layout',
                            playlist:dataPlaylist,
                            data:[{
                                id_playlist: null,
                            }],
                            status:false
                        });
                    }
            })
        }
    )
})
// tambah playlist
app.post('/addPlaylist',(req,res) => {
    const judul = req.body.nama_playlist;
    const id_user = res.locals.id_user;
    const description = req.body.description;
    const sql = 'insert into playlist (nama_playlist,id_user,description) value (?,?,?)';
    connection.query(sql,[judul,id_user,description],(error,result)=>{
        res.redirect('/index');
    })
})
// hapus playlist
app.get('/removePlaylist/:id',(req,res)=>{
    const id = [req.params.id]
    connection.query('delete from playlist where id_playlist=?',id,(error,result)=>{
        connection.query('delete from playlist_lagu where id_playlist=?',id,(error,result)=>{
            res.redirect('/index');
        })
    })
})
// edit playlist
app.post('/editPlaylist/:id',(req, res)=> {
    const id = req.params.id;
    const nama = req.body.nama_playlist;
    const description = req.body.description;
    const sql = 'UPDATE playlist SET nama_playlist=?,description=? WHERE id_playlist = ?';

    connection.query(sql,[nama,description,id],(error,result) => {
        res.redirect('/playlist/'+id);
        console.log('edit nama berhasil');
    });
});
// tambah lagu ke playlist
app.post('/tambahLagu',(req,res)=>{
    const idPlaylist = req.body.idPlaylist
    const idLagu = req.body.idLagu
    const sql = 'INSERT INTO playlist_lagu (id_playlist,id_lagu) value (?,?)';
    connection.query(sql,[idPlaylist,idLagu],(req,res)=>{
        console.log('berhasil ditambahkan');
    })
})
// hapus lagu di playlist
app.get('/hapusLagu/:idLagu/:idPlaylist',(req,res)=>{
    const idLagu = req.params.idLagu;
    const idPlaylist = req.params.idPlaylist;
    const sql = 'DELETE FROM playlist_lagu WHERE id_playlist = ? && id_lagu = ?';
    connection.query(sql,[idPlaylist,idLagu],(error,result)=>{
        res.redirect('/playlist/'+idPlaylist);
    })
})
// halaman admin
app.get('/admin',(req,res)=> {
    connection.query('SELECT COUNT(*) AS count_user FROM users',(error,user)=> {
        connection.query('SELECT COUNT(*) AS count_artis FROM artis',(error,artis)=> {
            connection.query('SELECT COUNT(*) AS count_lagu FROM lagu',(error,lagu)=> {
                connection.query('SELECT COUNT(*) AS count_playlist FROM playlist',(error,playlist)=> {
                    res.render('admin/admin',{
                        title: 'admin',
                        layout: 'layout/main-layout',
                        user:user[0].count_user,
                        artis:artis[0].count_artis,
                        lagu:lagu[0].count_lagu,
                        playlist:playlist[0].count_playlist
                    });           
                })
            })
        })
    })
})
// user
app.get('/user',(req,res)=> {
        connection.query('SELECT * FROM users',(error,result)=>{
            res.render('admin/user',{
                title: 'user',
                layout: 'layout/main-layout',
                data: result
            });
        })
})
app.get('/addUser',(req,res)=> {
    res.render('admin/CRUD/addUser',{
        title: 'tambah pengguna',
        layout: 'layout/main-layout',
    })
});
app.post('/createUser',(req,res,next)=> {
    const error = [];
    const nama = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    //validasi memeriksa error
    if(nama === ""){
        error.push('nama tidak boleh kosong')
    };
    if(email === ""){
        error.push('email tidak boleh kosong')
    }
    if(password === ""){
        error.push('password tidak boleh kosong')
    }
    if(error.length > 0){
        res.render('admin/CRUD/addUser',{
            title: 'tambah pengguna',
            layout: 'layout/main-layout',
            errors:error
        });
        console.log(error)
    }else {
        next();
    }
},(req,res,next)=>{
    //memeriksa duplikat
    const nama = req.body.username;
    const email = req.body.email;
    const errort = []
    connection.query('SELECT * FROM users WHERE email_user = ?',[email],(error,result)=> {
        if(result.length > 0){
            console.log('validasi email');
            errort.push('email sudah ada!');
            console.log(result)
        };
        connection.query('SELECT * FROM users WHERE user_name = ?',[nama],(error,resultNama)=> {
            console.log('validasi nama');
            if(resultNama.length > 0){
                console.log('validasi nama');
                errort.push('nama sudah ada!');
                console.log(result)
            };
            console.log(errort);
            if(errort.length > 0){
                res.render('admin/CRUD/addUser',{
                    title: 'tambah pengguna',
                    layout: 'layout/main-layout',
                    errors:errort
                });
            } else {
                next();
            }
        });
    })
},(req,res,next)=> {
    //daftar user
    const nama = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    connection.query('INSERT INTO users (user_name,email_user,password_user) VALUES (?,?,?)',[nama,email,password],(req,result)=> {
        console.log('daftar berhasil');
        res.redirect('/user');
    })
})
app.get('/deleteUser/:id',(req,res)=> {
    console.log(req.params.id);
    connection.query('DELETE FROM users WHERE id_user=?',[req.params.id],(error,result)=>{
        console.log('data berhasil dihapus');
        res.redirect('/user');
    })
})
app.get('/updateUser/:id',(req,res)=> {
    connection.query('SELECT * FROM users WHERE id_user=?',[req.params.id],(error,result)=>{
        res.render('admin/CRUD/updateUser',{
            title: 'update user',
            layout: 'layout/main-layout',
            data: result[0]
        });
    })
});
app.post('/editUser/:id',(req,res)=> {
    connection.query('UPDATE users SET user_name=?,email_user=?,password_user=? WHERE id_user=?',[req.body.username,req.body.email,req.body.password,req.params.id],(error,result)=>{
        res.redirect('/user');
        console.log(error);
        console.log(req.params.id)
    })
});

// artis
app.get('/artis',(req,res)=> {
    connection.query('SELECT * FROM artis',(error,result)=> {
        res.render('admin/artis',{
            title: 'artis',
            layout: 'layout/main-layout',
            data: result
        });
        // console.log(result)
    })
});
app.get('/addArtis',(req,res)=> {
    connection.query('SELECT id_genre FROM genre',(error,genres)=> {
        connection.query('SELECT id_album FROM album',(error,album)=> {
            res.render('admin/CRUD/addArtis',{
                title: 'tambah artis',
                layout: 'layout/main-layout',
                genre: genres,
                album: album
            });
        })
    })
});
app.post('/createArtis',(req, res)=> {
    connection.query('INSERT INTO artis (id_artis,nama_artis,id_genre,id_album) values (?,?,?,?)',[req.body.id_artis,req.body.username,req.body.genre,req.body.album],(error,result)=>{
        res.redirect('/artis');
    })
})
app.get('/updateArtis/:id',(req,res)=> {
    connection.query('SELECT * FROM artis WHERE id_artis=?',[req.params.id],(error,result)=>{
        connection.query('SELECT id_genre FROM genre',(error,genres)=> {
            connection.query('SELECT id_album FROM album',(error,album)=> {
                res.render('admin/CRUD/updateArtis',{
                    title: 'update artis',
                    layout: 'layout/main-layout',
                    data: result[0],
                    genre: genres,
                    album: album
                });
            })
        })
    });
})
app.post('/editArtis/:id',(req,res)=>{
    connection.query('UPDATE artis SET nama_artis = ?,id_genre=?,id_album=? WHERE id_artis=?',[req.body.username,req.body.genre,req.body.album,req.params.id],(error,result)=>{
        res.redirect('/artis');
        console.log(error);
        // console.log(req.params.id)
    })
})
app.get('/deleteArtis/:id',(req,res)=> {
    connection.query('DELETE FROM artis WHERE id_artis = ?',[req.params.id],(error,result)=> {
        res.redirect('/artis');
    })
    // console.log(req.params.id)
})

// lagu
app.get('/lagu',(req,res)=> {
    connection.query('SELECT * FROM lagu',(error,result)=> {
        res.render('admin/lagu',{
            title: 'lagu',
            layout: 'layout/main-layout',
            data:result
        });
    })

})
app.get('/addLagu',(req,res)=> {
    connection.query('SELECT id_artis FROM artis',(error,artis)=> {
        connection.query('SELECT id_album FROM album',(error,album)=> {
            res.render('admin/CRUD/addLagu',{
                title: 'tambah lagu',
                layout: 'layout/main-layout',
                artis: artis,
                album:album
            });
        })
    })
})
app.post('/createLagu',upload.single('filemp3'),(req, res) => {
    const file = req.file;
    const fileName = file.originalname;
    const judul_lagu = req.body.judul_lagu
    const id_artis = req.body.id_artis
    const lirik = req.body.lirik
    const id_album = req.body.id_album
    const single = req.body.single
    connection.query(
        'INSERT INTO lagu (judul_lagu,path,id_artis,lirik,id_album,single) value (?,?,?,?,?,?)', [judul_lagu,fileName,id_artis,lirik,id_album,single],
        (error,results) => {
            console.log('File saved successfully');
            res.redirect('/lagu');
        }
    );
})
app.get('/updateLagu/:id',(req,res)=> {
    connection.query('SELECT * FROM lagu WHERE id_lagu = ?',[req.params.id],(error,result)=> {
        connection.query('SELECT id_artis FROM artis',(error,artis)=> {
            connection.query('SELECT id_album FROM album',(error,album)=> {
                res.render('admin/CRUD/updateLagu',{
                    title: 'update lagu',
                    layout: 'layout/main-layout',
                    artis: artis,
                    album:album,
                    data: result[0]
                });
            })
        })
    })
})
app.post('/editLagu/:id',upload.single('filemp3'),(req, res) => {
    const file = req.file;
    const fileName = file.originalname;
    const id_lagu = req.params.id;
    const judul_lagu = req.body.judul_lagu
    const id_artis = req.body.id_artis
    const lirik = req.body.lirik
    const id_album = req.body.id_album
    const single = req.body.single
    connection.query(
        'UPDATE lagu SET judul_lagu=?,path=?,id_artis=?,lirik=?,id_album=?,single=? WHERE id_lagu=?', [judul_lagu,fileName,id_artis,lirik,id_album,single,id_lagu],
        (error,results) => {
            console.log('File update successfully');
            res.redirect('/lagu');
        }
    );
})
app.get('/deleteLagu/:id',(req,res)=> {
    connection.query('DELETE FROM lagu WHERE id_lagu=?',[req.params.id],(error,result)=> {
        res.redirect('/lagu');
    })
})

// album
app.get('/album',(req,res)=> {
    connection.query('SELECT * FROM album',(error,result)=> {
        res.render('admin/album',{
            title: 'album',
            layout: 'layout/main-layout',
            data: result
        });
    })
})
app.get('/addAlbum',(req,res)=> {
    connection.query('SELECT id_artis FROM artis',(error,artis)=> {
        res.render('admin/CRUD/addAlbum',{
            title: 'tambah album',
            layout: 'layout/main-layout',
            artis: artis
        });
    })
});
app.post('/createAlbum',(req,res)=> {
    const id_album = req.body.id_album
    const nama_album = req.body.nama_album
    const id_artis = req.body.id_artis
    const tahun_rilis = req.body.tahun_rilis;
    connection.query('INSERT INTO album (id_album,nama_album,id_artis,tahun_rilis) VALUES (?,?,?,?)',[id_album,nama_album,id_artis,tahun_rilis],(error,result)=> {
        console.log('album berhasil di tambhakan');
        res.redirect('/album');
    })
});
app.get('/updateALbum/:id',(req,res)=> {
    connection.query('SELECT * FROM album WHERE id_album = ?',[req.params.id],(error,result)=> {
        connection.query('SELECT id_artis FROM artis',(error,artis)=> {
            res.render('admin/CRUD/updateAlbum',{
                title: 'update album',
                layout: 'layout/main-layout',
                artis: artis,
                data: result[0]
            });
        })
    })
});
app.post('/editAlbum/:id',(req,res)=> {
    console.log(req.params.id)
    console.log(req.body.nama_album)
    console.log(req.body.id_artis)
    console.log(req.body.tahun_rilis);
    connection.query('UPDATE album SET nama_album=?,id_artis=?,tahun_rilis=? WHERE id_album = ?',[req.body.nama_album,req.body.id_artis,req.body.tahun_rilis,req.params.id],(error,result)=> {
        res.redirect('/album');
    })
});
app.get('/deleteAlbum/:id',(req,res)=> {
    connection.query('DELETE FROM album WHERE id_album = ?',[req.params.id],(error,result)=> {
        res.redirect('/album')
    })
})
// playlist
app.get('/getPlaylist',(req,res)=>{
    connection.query('SELECT * FROM playlist',(error,result)=> {
        res.render('admin/playlist',{
            title: 'playlist',
            layout: 'layout/main-layout',
            data: result
        });
    })
})





app.listen(3000,()=> {
    console.log('listening on http://localhost:3000')
})