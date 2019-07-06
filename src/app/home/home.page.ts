import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, DbTransaction, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  config = {
    name: 'sekolah.db',
    location: 'default'
  };

  nis: string;
  nama: string;
  tlp: string;
  nilai: number;

  dataSiswa: any = [];

  constructor(private sqlite: SQLite, public nav: Router) {
    this.initTable();
  }

  inputData() {
    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      // tslint:disable-next-line:max-line-length
      q.executeSql('INSERT INTO siswa VALUES(?,?,?,?)', [`${this.nis}`, `${this.nama}`, `${this.tlp}`, `${this.nilai}`]).then((res: any) => {
        console.log('insert berhasil');
        this.ambilData();
      }, err => {
        console.log('insert gagal');
      });
    }, err => {
      console.log(err);
    });
  }

  ambilData() {
    this.dataSiswa = [];
    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      q.executeSql('SELECT * FROM siswa', []).then((r: any) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < r.rows.length; i++) {
          this.dataSiswa.push(r.rows.item(i));
          console.log(r.rows.item(i));
        }

        console.log(r.rows.length);
      }, e => {
        console.log(e);
      });
    }, err => {
      console.log(err);
    });
  }

  updateUser(nis) {
    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      // tslint:disable-next-line:max-line-length
      q.executeSql('UPDATE siswa SET nama = ?,phone = ?,nilai = ? WHERE nis = ?', [`${this.nama}`, `${this.tlp}`, `${this.nilai}`, `${nis}`]).then((r: any) => {
        console.log('Update berhasil');
        this.ambilData();
      }, e => {
        console.log('Update gagal');
        console.log(e);
      });
    }, err => {
      console.log(err);
    });
  }

  hapusUser(nis) {
    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      q.executeSql('DELETE FROM siswa WHERE nis = ?', [`${nis}`]).then((r: any) => {
        console.log('Hapus berhasil');
        this.ambilData();
      }, e => {
        console.log('Hapus gagal');
        console.log(e);
      });
    }, err => {
      console.log(err);
    });
  }

  initTable() {
    this.sqlite.create(this.config).then((q: SQLiteObject) => {
      // tslint:disable-next-line:max-line-length
      q.transaction((tx: DbTransaction) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS siswa (nis text NOT NULL UNIQUE,nama TEXT,phone text UNIQUE,nilai INTEGER)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS nilai (nilai INTEGER,id_siswa INTEGER)');
      }).then(res => {
        console.log('Buat tabel-tabel berhasil');
      }, err => {
        console.log(err);
      });

    }, err => {
      console.log(err);
    });
  }

  hapusDb() {
    this.sqlite.deleteDatabase(this.config).then(res => {
      console.log('Hapus DB Berhasil');
    }, err => {
      console.log(err);
    });
  }

  pindah() {
    let total = 0;
    this.dataSiswa.map((v, i) => {
      total += v.nilai;
      if (this.dataSiswa.length === i + 1) {
        this.nav.navigate(['detail', JSON.stringify({
          data: total
        })]);
      }
    });
  }

}
