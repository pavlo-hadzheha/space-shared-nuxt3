import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/currentUserDecorator';
import { AuthGuard } from 'src/guards/AuthGuard';
import { Category } from 'src/models/category.model';
import { User } from 'src/models/user.model';
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
    async getAllCategories(
    ): Promise<EditCategoryDto[]> {
        const categories = await this.categoryService.getAll();

        return categories.map(category => category);
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
    async updateCategory(@Body() category: EditCategoryDto): Promise<Category> {
        return await this.categoryService.update(category);
    }

    @ApiOkResponse({ type: Boolean })
    @UseGuards(AuthGuard)
    @Delete('/:categoryId')
    async removeCategory(@Param('categoryId') categoryId: string): Promise<boolean> {
        return await this.categoryService.remove(categoryId);
    }
}
