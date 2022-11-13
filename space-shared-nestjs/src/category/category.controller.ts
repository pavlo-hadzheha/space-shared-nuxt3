import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateCategoryDto, EditCategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(
        @Inject(CategoryService) private categoryService: CategoryService,
    ) { }

    @ApiOkResponse({ type: [EditCategoryDto] })
    @Get('/all')
    getAllCategories(
    ): Promise<EditCategoryDto[]> {
        return this.categoryService.getAll();
    }

    @ApiOkResponse({ type: EditCategoryDto })
    @Get('/:categoryId')
    getCategoryById(
        @Param('categoryId') categoryId: string
    ): Promise<EditCategoryDto> {
        return this.categoryService.getById(categoryId)
    }

    @ApiCreatedResponse({ type: EditCategoryDto })
    @UseGuards(AuthGuard)
    @Post()
    createCategory(@Body() category: CreateCategoryDto): Promise<EditCategoryDto> {
        return this.categoryService.create(category);
    }

    @ApiOkResponse({ type: EditCategoryDto })
    @UseGuards(AuthGuard)
    @Put()
    updateCategory(@Body() category: EditCategoryDto): Promise<EditCategoryDto> {
        return this.categoryService.update(category);
    }

    @ApiOkResponse({ type: Boolean })
    @UseGuards(AuthGuard)
    @Delete('/:categoryId')
    removeCategory(@Param('categoryId') categoryId: string): Promise<boolean> {
        return this.categoryService.remove(categoryId);
    }
}
