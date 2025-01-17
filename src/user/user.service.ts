import { Injectable, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getProfile(id: string) {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const linkedinData = await this.scrapeLinkedInProfile(user.linkedinUrl);
    console.log(linkedinData);
    
    return {data : linkedinData};
  }

  async scrapeLinkedInProfile(linkedinUrl: string) {
    const browser = await puppeteer.launch({ headless: true }); // شغل المتصفح بشكل مرئي
    const page = await browser.newPage();
  
    try {
      // اذهب لصفحة اللوجين
      await page.goto('https://www.linkedin.com/login');
  
      // اكتب الايميل والباسورد
      await page.type('#username', process.env.EMAIL); // ايميل LinkedIn
      await page.type('#password', process.env.PASSWORD); // باسورد LinkedIn
  
      // اضغط على زر التسجيل
      await page.click('button[type="submit"]');
  
      // انتظر لحد ما يتم التسجيل
      await page.waitForNavigation();
  
      // اذهب لصفحة البروفايل
      await page.goto(linkedinUrl);
  
      // await page.waitForSelector('.EXUlpYtRCtqORJJicvnDyWIlLXPKHYvQEKE');
  
      const profileData = await page.evaluate(() => {
        const name = document.querySelector('.nloLDbwCtFTNMEvHXIbKRMhHxihINtkfMyqgs')?.textContent?.trim();
  
        const jobTitle = document.querySelector('.text-body-medium.break-words')?.textContent?.trim();
  
        const location = document.querySelector('.text-body-small.inline.t-black--light.break-words')?.textContent?.trim();
  
        const about = document.querySelector('.SWmEeHmwwuhVUsHtDfuBKMBizUgsHeIISmAIQ span')?.textContent?.trim();
  
        // // استخراج الخبرات العملية
        // const experiences = Array.from(document.querySelectorAll('.pv-position-entity')).map((exp) => {
        //   const title = exp.querySelector('.pv-entity__summary-info h3')?.textContent?.trim();
        //   const company = exp.querySelector('.pv-entity__secondary-title')?.textContent?.trim();
        //   const duration = exp.querySelector('.pv-entity__date-range span:last-child')?.textContent?.trim();
        //   return { title, company, duration };
        // });
  
        // // استخراج التعليم
        // const education = Array.from(document.querySelectorAll('.pv-education-entity')).map((edu) => {
        //   const school = edu.querySelector('.pv-entity__school-name')?.textContent?.trim();
        //   const degree = edu.querySelector('.pv-entity__degree-name')?.textContent?.trim();
        //   const fieldOfStudy = edu.querySelector('.pv-entity__fos')?.textContent?.trim();
        //   return { school, degree, fieldOfStudy };
        // });
  
        // // استخراج المهارات
        // const skills = Array.from(document.querySelectorAll('.pv-skill-category-entity__skill-wrapper')).map((skill) => {
        //   return skill.querySelector('.pv-skill-category-entity__name-text')?.textContent?.trim();
        // });
  
        return {
          name,
          jobTitle,
          location,
          about,
          // experiences,
          // education,
          // skills,
        };

      });

      return profileData
  
  
    } catch (error) {
      console.error('Error during scraping:', error);
    } finally {
      await browser.close();
    }
  }
}