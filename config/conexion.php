<?php
    class Conectar{
        protected $dbh;

        public function __construct()
        {
            $this->Conexion();
        }

        protected function Conexion(){
            try{
                $conexion = $this->dbh = new PDO("pgsql:host=localhost;dbname=producto","postgres","123");
                return $this->dbh;
            }catch(Exception $e){
                echo "Error al conectar DB: ".$e->getMessage();
                die();
            }
        }
    }

try{
    $conexion = new Conectar();
}catch(Exception $e){
    echo   "Error: ".$e->getMessage();
}
?>