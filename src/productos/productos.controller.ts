import { Controller, Get } from '@nestjs/common';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}
  @Get('productos-con-baja-cantidad')
  async obtenerProductosConBajaCantidad(): Promise<{ productos: { producto__nombre: string; total_cantidad: number }[] }> {
    const productosCantidad = await this.productosService.obtenerCantidadTotalPorProducto();
    // Mapear las claves para que coincidan con lo esperado
    const productosConBajaCantidad = productosCantidad
      .filter((producto) => producto.total_cantidad < 10);
    return { productos: productosConBajaCantidad };
  }
  @Get('lotes-vencen')
  async obtenerLotesVencen(): Promise<any[]> {
    const lotes = await this.productosService.obtenerLotesVencen();
    // Obtener la fecha de hoy y calcular el límite de 8 días
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 8);
    // Filtrar los lotes que tienen una fecha de caducidad dentro del rango
    const lotesVencenEn8Dias = lotes.filter((lote) => {
      const fechaCaducidad = new Date(lote.fechacaducidad);
      return fechaCaducidad >= hoy && fechaCaducidad <= limite;
    });
    return lotesVencenEn8Dias;
  }
}
