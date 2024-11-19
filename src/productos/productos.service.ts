import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface ProductoCantidad {
  producto__nombre: string; // Nombre del producto
  total_cantidad: number;   // Cantidad total asociada al producto
}

@Injectable()
export class ProductosService {
  private readonly backendUrl = 'http://localhost:8001/api';
  // Consulta para obtener la cantidad total de productos.
  async obtenerCantidadTotalPorProducto(): Promise<ProductoCantidad[]> {
    try {
      const response = await axios.get<ProductoCantidad[]>(`${this.backendUrl}/cantidadtotal`);
      const productosCantidad = response.data; // Se espera un arreglo de objetos con el formato de ProductoCantidad
      return productosCantidad;
    } catch (error) {
      console.error('Error al obtener la cantidad total por producto:', error);
      throw new Error('No se pudieron obtener los datos desde el backend');
    }
  }
  // Consulta para obtener los lotes que vencen entre hoy y la próxima semana.
  async obtenerLotesVencen(): Promise<{
    id: number;
    producto_nombre: string;
    fechaentrega: string | null;
    estado: string;
    cantidad: number;
    fechacaducidad: string;
    proveedor: string;
  }[]> {
    try {
      const response = await axios.get<{
        id: number;
        producto_nombre: string;
        fechaentrega: string | null;
        estado: string;
        cantidad: number;
        fechacaducidad: string;
        proveedor: string;
      }[]>(`${this.backendUrl}/lotescaducar`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los lotes próximos a caducar:', error);
      throw new Error('No se pudieron obtener los lotes próximos a caducar');
    }
  }
}