<?php
class Producto extends Conectar{
    public function get_producto(){
        $conectar = parent::Conexion();
        $sql = "SELECT name AS prod_name, code AS prod_id FROM producto where state = TRUE";
        $sql = $conectar->prepare($sql);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }
    public function get_producto_x_id($prod_id) {
        try {
            $conectar = parent::Conexion();
            $sql = "SELECT name AS prod_name, code as prod_id FROM producto WHERE code = ?";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $prod_id);
            $sql->execute();
            return $resultado = $sql->fetchAll();
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return [];
        }
        }

    public function delete_producto($prod_id){
        $conectar = parent::Conexion();
        $sql = "UPDATE producto SET state = FALSE WHERE code = ?";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1,$prod_id);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }
    public function update_producto($prod_id,$prod_name){
        $conectar = parent::Conexion();
        $sql = "UPDATE producto SET name = ? WHERE code = ?";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(2,$prod_id);
        $sql->bindValue(1,$prod_name);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }
    public function insert_producto($prod_name){
        $conectar = parent::Conexion();
        $sql = "INSERT INTO producto (name,creation,state) VALUES (?,now(), TRUE)";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1,$prod_name);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }
    
}
?>