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
    return lotes;
  }
}
