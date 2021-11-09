import java.io.*;
import java.util.Scanner;

public class Main
{
    private final static String[] HEADERS = {"Title", "Day", "Month", "Year", "Category", "Income/Expense", "Amount"};
    private final static String[] CATEGORIES = {"Entertainment", "Utilities", "Personal", "Food", "Accommodation", "Health"};
    private final static String[] CATEGORY_TYPE = {"Income", "Expense"};
    private final static int NUM_OF_TRANSACTION = 1000;
    private final static double MINIMUM_TRANSACTION_AMOUNT = 0.1;
    private final static double MAXIMUM_TRANSACTION_AMOUNT = 9999.99;
    private final static int MINIMUM_DATE_YEAR = 2000;
    private final static int MAXIMUM_DATE_YEAR = 2021;
    private final static String OUTPUT_FILE_NAME = "Fake Data.csv";
    private final static String TITLES_FILE_NAME = "titles.txt";
    private static final String[] TITLES = new String[NUM_OF_TRANSACTION];

    public static void main(String[] args)
    {

        File fakeDate = new File("../", OUTPUT_FILE_NAME);
        readTitles();
        writeDate(fakeDate);
    }

    private static void writeDate(File toWriteTo)
    {
        try
        {
            PrintWriter out = new PrintWriter(toWriteTo);

            for (int i=0; i<HEADERS.length; i++) {
                if(i < HEADERS.length - 1)
                {
                    out.print(HEADERS[i] + ",");
                }
                else
                {
                    out.print(HEADERS[i]);
                }

            }
            out.print("\n");


            for(int i = 0; i<NUM_OF_TRANSACTION; i++)
            {
                String title;
                int randomTitle;

                do {
                    randomTitle = randomInt(0, TITLES.length);
                    title = "\"" + TITLES[randomTitle] + "\"";
                } while (TITLES[randomTitle] == null);

                String date = dateGenerator();
                Scanner dateParser = new Scanner(date);
                dateParser.useDelimiter("/");
                String day = String.valueOf(dateParser.nextInt());
                String month = String.valueOf(dateParser.nextInt());
                String year = String.valueOf(dateParser.nextInt());
                String category = CATEGORIES[randomInt(0, CATEGORIES.length)];
                String categoryType = CATEGORY_TYPE[randomInt(0, CATEGORY_TYPE.length)];
                String amount = String.format("%.2f", randomDouble(MINIMUM_TRANSACTION_AMOUNT, MAXIMUM_TRANSACTION_AMOUNT));

                out.print(title + "," + day + "," + month + "," + year + "," + category + "," + categoryType + "," + amount + "\n");
            }

            out.close();
        }
        catch (IOException e)
        {
            System.out.println("\n*** Error: Problem Occurred\n" + e.getMessage());
        }
    }

    private static void readTitles()
    {
        try
        {
            BufferedReader titleInput = new BufferedReader(new FileReader(TITLES_FILE_NAME));
            String line;
            int counter = 0;

            while( ( ( line = titleInput.readLine() ) != null ) && counter < NUM_OF_TRANSACTION)
            {
                TITLES[counter] = line;
                counter++;
            }

            titleInput.close();
        }
        catch (IOException e)
        {
            System.out.println("\n*** Error: File not found\n" + e.getMessage());
        }
    }

    private static String dateGenerator()
    {
        String dateGenerated;

        String generatedMonth = String.valueOf(randomInt(1, 12));
        int monthChecker = Integer.parseInt(generatedMonth);

        if(monthChecker < 10)
        {
            generatedMonth = "0"+generatedMonth;
        }

        String generatedDay;

        if(monthChecker == 2)
        {
            generatedDay = String.valueOf(randomInt(1, 28));
        }
        else if(monthChecker == 4 || monthChecker == 6 || monthChecker == 9 || monthChecker == 11 )
        {
            generatedDay = String.valueOf(randomInt(1, 30));
        }
        else
        {
            generatedDay = String.valueOf(randomInt(1, 31));
        }

        if(Integer.parseInt(generatedDay) < 10)
        {
            generatedDay = "0"+generatedDay;
        }

        String generatedYear = String.valueOf(randomInt(MINIMUM_DATE_YEAR, MAXIMUM_DATE_YEAR));

        dateGenerated = generatedMonth+"/"+generatedDay+"/"+generatedYear;
        return dateGenerated;
    }

    public static int randomInt(int Min, int Max)
    {
        return (int)( Math.random() * ( Max-Min ) ) + Min;
    }

    public static double randomDouble(double Min, double Max)
    {
        return  Math.random() * ( Max-Min )  + Min;
    }

}
