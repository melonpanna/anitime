package com.moi.anitime.model.service.animal;

import com.moi.anitime.api.response.animal.AnimalPreviewRes;
import com.moi.anitime.api.response.profile.ProfileRes;
import com.moi.anitime.exception.animal.CountAnimalsException;
import com.moi.anitime.exception.animal.ListLoadingException;
import com.moi.anitime.model.entity.animal.Animal;
import com.moi.anitime.model.entity.animal.AnimalCount;
import com.moi.anitime.model.entity.profile.Profile;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AnimalService {
    public List<AnimalPreviewRes> getAllAnimal(int generalNo, int kindType, int genderType, int sortType, int curPageNo) throws ListLoadingException;

    public List<AnimalPreviewRes> getBookmarkedAnimal(int generalNo, int curPageNo) throws ListLoadingException;

    public Optional<Animal> getAnimal(long generalNo)throws ListLoadingException;

    public void dataUpdate(List<Animal> animalList);

    public List<AnimalPreviewRes> getAnimalRecommand(ProfileRes profile, int curPageNo)throws ListLoadingException;

    public int countNewAnimals() throws CountAnimalsException;

    public int countKeepingAnimals() throws CountAnimalsException;

    public int countPostingAnimals() throws CountAnimalsException;

    public List<AnimalCount> getAnimalCount();
    public void cntDataUpdate(List<AnimalCount> animalCountls);
    public Map<String, Integer> countReport() throws CountAnimalsException;

}
